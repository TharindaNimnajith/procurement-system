const HttpError = require('../models/http-errors');
const Sites = require('../models/site.model');

// method to insert sites
const createSites = async (req, res, next) => {
  const {
    siteName,
    siteManager
  } = req.body;

  const SitesItem = new Sites({
    siteName,
    siteManager
  });

  try {
    await SitesItem.save();
  } catch (err) {
    console.log(err);
    const error = new HttpError('Adding failed, please try again.', 500);
    res.json({
      message: 'Adding failed, please try again.',
      added: 0
    });
    return next(error);
  }

  res.status(201).json({
    sitesItem: SitesItem.toObject({
      getters: true
    }),
    message: 'Added Successfully',
    added: 1
  });
};

// method to retrieve sites list
const getSites = async (req, res) => {
  Sites.find({})
    .then((sites) =>
      res.json({
        sites: sites,
        message: 'Retrieved Successfully'
      })
    )
    .catch((err) => res.status(400).json('Error: ' + err));
};

// method to edit sites
const editSites = async (req, res) => {
  const {
    sites,
    id
  } = req.body;

  const query = {
    '_id': id
  };

  Sites.findOneAndUpdate(query, sites, {upsert: true}, (err, item) => {
    if (err)
      return res.send(500, {
        error: err
      });
    return res.json({
      sites: item,
      message: 'Edited Successfully'
    });
  });
};

// method to delete sites
const deleteSites = async (req, res) => {
  const {
    id
  } = req.body;

  Sites.findByIdAndDelete((id), {}, (err) => {
    if (err)
      return res.status(500).send(err);
  });

  return res.json({
    message: 'Deleted Successfully'
  });
};

// method to retrieve a single site
const getSite = async (req, res, next) => {
  let site;

  const {
    id
  } = req.params;

  try {
    site = await Sites.findById(id);
  } catch (error) {
    console.log(error);
    return next(new HttpError('Unexpected internal server error occurred, please try again later.', 500));
  }

  res.status(200).send(site);
};

exports.createSites = createSites;
exports.editSites = editSites;
exports.getSites = getSites;
exports.getSite = getSite;
exports.deleteSites = deleteSites;
