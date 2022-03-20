
const message = type => ({
  message: `${type} request complete.`,
  type: "success"
});

// @access  Public
// @route   GET server/v1/sample
// @desc    API test response endpoint.
const getSample = async (req, res) => {
  try {
    res.status(200).json({ result: message("GET") });
  } catch(error) {
    res.status(500).json({ error });
  }
};

// @access  Public
// @route   GET server/v1/sample/limitTest
// @desc    API test endpoint for rate limiter.
const getLimitTest = async (req, res) => {
  try {
    res.status(200).json({ result: "Rate call complete." });
  } catch(error) {
    res.status(500).json({ error });
  }
};

// @access  Public
// @route   POST server/v1/sample
// @desc    API test response endpoint.
const postSample = async (req, res) => {
  try {
    res.json({ message: message("POST") });
  } catch(error) {
    res.status(500).json({ error });
  }
};

// @access  Public
// @route   PUT server/v1/sample/:id
// @desc    API test response endpoint.
const putSample = async (req, res) => {
  try {
    const id = req.params.id;
    res.json({ message: message("PUT") });
  } catch(error) {
    res.status(500).json({ error });
  }
};

// @access  Public
// @route   DELETE server/v1/sample/:id
// @desc    API test response endpoint.
const deleteSample = async (req, res) => {
  try {
    const id = req.params.id;
    res.json({ message: message("DELETE") });
  } catch(error) {
    res.status(500).json({ error });
  }
};

module.exports = {
  getSample,
  getLimitTest,
  postSample,
  putSample,
  deleteSample,
};