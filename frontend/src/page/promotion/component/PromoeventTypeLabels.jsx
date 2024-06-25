import React from "react";

const eventTypeLabels = {
  movie: "영화",
  theater: "극장",
  membership: "멤버십",
  discount: "제휴/할인",
};

export const getEventTypeLabel = (eventType) => {
  return eventTypeLabels[eventType] || eventType;
};

const EventTypeLabel = ({ eventType }) => {
  return <span>{getEventTypeLabel(eventType)}</span>;
};

export default EventTypeLabel;
