package com.backend.service.login;

import com.backend.domain.login.Login;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(rollbackFor = Exception.class)
@RequiredArgsConstructor
public class LoginService {


    public Login register(String code) {
        return null;
    }
}
