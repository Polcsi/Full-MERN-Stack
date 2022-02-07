const getDashboardData = (req, res) => {
  res.json({
    status: "success",
    msg: "Successfully you get the dashboard data!",
  });
};

module.exports = {
  getDashboardData,
};
