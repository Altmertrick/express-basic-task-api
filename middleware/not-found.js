const notFound = (req, res) => {
  res.status(404).send(`Rout ${req.url} does not exist`);
};

module.exports = notFound;
