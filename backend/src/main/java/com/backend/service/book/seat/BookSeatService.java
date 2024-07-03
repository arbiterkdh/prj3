package com.backend.service.book.seat;

import com.backend.domain.book.BookPlaceTime;
import com.backend.domain.book.seat.BookSeat;
import com.backend.domain.movie.Movie;
import com.backend.domain.theater.Theater;
import com.backend.domain.theater.box.TheaterBox;
import com.backend.domain.theater.box.TheaterBoxMovie;
import com.backend.mapper.book.BookMapper;
import com.backend.mapper.book.seat.BookSeatMapper;
import com.backend.mapper.movie.MovieMapper;
import com.backend.mapper.theater.TheaterMapper;
import com.backend.mapper.theater.box.TheaterBoxMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Transactional(rollbackFor = Exception.class)
@RequiredArgsConstructor
public class BookSeatService {

    @Value("${aws.s3.bucket.name}")
    String bucketName;

    @Value("${image.src.prefix}")
    String srcPrefix;

    private final BookMapper bookMapper;
    private final BookSeatMapper bookSeatMapper;
    private final TheaterBoxMapper theaterBoxMapper;
    private final TheaterMapper theaterMapper;
    private final MovieMapper movieMapper;

    public Map<String, Object> getDataByBookPlaceTimeId(Integer bookPlaceTimeId, Integer bookSeatMemberNumber) {
        Map<String, Object> data = new HashMap<>();

        List<String> rowColList = bookSeatMapper.selectAllRowColByBookPlaceTimeId(bookPlaceTimeId);
        List<String> selectedList = bookSeatMapper.selectAllRowColByBookPlaceTimeIdAndBookSeatMemberNumberWithoutPayment(bookPlaceTimeId, bookSeatMemberNumber);
        List<String> isPaidRowColList = bookSeatMapper.selectAllPaidRowColByBookPlaceTimeId(bookPlaceTimeId);
        BookPlaceTime bookPlaceTime = bookMapper.selectBookPlaceTime(bookPlaceTimeId);
        TheaterBoxMovie theaterBoxMovie = theaterBoxMapper.selectTheaterBoxMovieByBookPlaceTimeId(bookPlaceTimeId);
        TheaterBox theaterBox = theaterBoxMapper.selectTheaterBoxByTheaterBoxMovieId(theaterBoxMovie.getId());
        Theater theater = theaterMapper.selectTheaterByTheaterNumber(theaterBox.getTheaterNumber());
        Movie movie = movieMapper.selectByMovieId(theaterBoxMovie.getMovieId());
        String file = STR."\{srcPrefix}/movie/\{movie.getId()}/\{movieMapper.selectFileNameByMovieId(movie.getId())}";
        movie.setMovieImageFile(file);

        data.put("rowColList", rowColList);
        data.put("selectedList", selectedList);
        data.put("isPaidRowColList", isPaidRowColList);
        data.put("bookPlaceTime", bookPlaceTime);
        data.put("theaterBoxMovie", theaterBoxMovie);
        data.put("theaterBox", theaterBox);
        data.put("theater", theater);
        data.put("movie", movie);

        return data;
    }

    public String handleBookSeat(BookSeat bookSeat) {
        boolean bookedSeatBySameMember = bookSeatMapper.checkBookSeatHasSameMemberNumber(bookSeat) == 1;
        boolean bookedSeat = bookSeatMapper.selectBookSeat(bookSeat) != null;

        Integer bookPlaceTimeId = bookSeat.getBookPlaceTimeId();

        if (bookedSeatBySameMember) {
            bookSeatMapper.deleteBookSeat(bookSeat);
            bookSeatMapper.updateBookPlaceTimeVacancy(bookPlaceTimeId, 1);
            return "deleted";
        } else if (bookedSeat) {
            return "alreadyBooked";
        } else {
            bookSeatMapper.insertBookSeat(bookSeat);
            bookSeatMapper.updateBookPlaceTimeVacancy(bookPlaceTimeId, -1);
            return "added";
        }
    }

    public List<String> getRowColList(BookPlaceTime bookPlaceTime) {
        if (bookPlaceTime != null) {
            return bookSeatMapper.selectAllRowColByBookPlaceTimeId(bookPlaceTime.getBookPlaceTimeId());
        }
        return new ArrayList<String>();
    }

    public void deleteAllBookSeatByBookSeatMemberNumber(Integer bookSeatMemberNumber, Integer bookPlaceTimeId) {
        Integer count = bookSeatMapper.countAllBookSeatByBookSeatMemberNumberAndBookPlaceTimeIdWithoutPayment(bookSeatMemberNumber, bookPlaceTimeId);

        bookSeatMapper.updateBookPlaceTimeVacancyByBookPlaceTimeIdUsingBookSeatMemberNumberWithoutPaymentCounted(count, bookPlaceTimeId);

        bookSeatMapper.deleteAllBookSeatByBookSeatMemberNumber(bookSeatMemberNumber);
    }

    public void removeBookSeatByTimeoutExpiredWithoutPayment() {
        List<BookPlaceTime> bookPlaceTimeList = bookSeatMapper.selectAllBookPlaceTimeByTimeoutExpiredWithoutPayment();

        if (bookPlaceTimeList != null) {

            for (BookPlaceTime bookPlaceTime : bookPlaceTimeList) {
                bookSeatMapper.updateBookPlaceTimeVacancy(bookPlaceTime.getBookPlaceTimeId(), 1);
            }

            bookSeatMapper.deleteBookSeatByCompareSelectedTimeWithCurrentTime();
        }
    }

    public boolean modifyBookSeatIsPaying(BookSeat bookSeat) {
        List<String> rowColList = bookSeat.getRowColList();
        int result = 0;
        for (String rowCol : rowColList) {
            bookSeat.setRowCol(rowCol);
            int count = bookSeatMapper.updateBookSeatIsPayingByBookSeat(bookSeat);
            result += count;
        }
        return result == rowColList.size();
    }
}
