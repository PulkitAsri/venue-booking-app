export const convertCalendarData = ({ allBookings }) => {
  const arr = [];
  let i = 0;
  allBookings.forEach((booking) => {
    arr.push({
      title: "",
      startDate: booking.timeSlotStart,
      endDate: booking.timeSlotEnd,
      id: i++,
      location: booking.venuePk.address,
    });
  });

  return arr;
};
