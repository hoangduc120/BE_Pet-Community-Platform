const Campaign = require('../models/campaign.model')

class CampaignService {
  createCampaign = async (title, description, startDate, endDate, targetAmount, image, user) => {
    const campaign = await Campaign.create({ title, description, startDate, endDate, targetAmount, image, user })
    return campaign
  }
  getCurrentCampaign = async () => {
    const currentDate = new Date()
    const campaign = await Campaign.findOne({
      startDate: { $lte: currentDate },
      endDate: { $gte: currentDate }
    })
    return campaign
  }
  getCampaigns = async (query) => {
    const { sortBy, limit, page, q } = query
    const filter = {}
    const options = {
      sortBy: sortBy || 'createdAt',
      limit: limit ? parseInt(limit) : 10,
      page: page ? parseInt(page) : 1,
      allowSearchFields: ['title'],
      q: q ?? '',
      fields: '-password'
    }
    return await Campaign.paginate(filter, options)
  }

  stopCampaign = async (id) => {
    await Campaign.findByIdAndUpdate(id, { isActive: false })
  }
}

module.exports = new CampaignService()
