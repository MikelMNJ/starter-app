
const message = type => ({
  message: `${type} /sample successful.`,
  icon: "fa-regular fa-file-code",
  type: "success"
});

// @access  Public
// @route   GET api/v1/sample
// @desc    API test response endpoint.
const getSample = async (req, res) => {
  try {
    res.status(200).json({ results: message("GET").message });
  } catch(error) {
    res.status(500).json({ error });
  }
};

// @access  Public
// @route   POST api/v1/sample
// @desc    API test response endpoint.
const postSample = async (req, res) => {
  try {
    res.json({ message: message("POST") });
  } catch(error) {
    res.status(500).json({ error });
  }
};

// @access  Public
// @route   PUT api/v1/sample/:id
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
// @route   DELETE api/v1/sample/:id
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
  postSample,
  putSample,
  deleteSample,
};