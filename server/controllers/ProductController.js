const axios = require("axios")
const Products = require("../models/ProductModel");

exports.intializeDatabase = async(req,res)=>{
    try {
        const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
        const data = response.data;
    
        await Products.insertMany(data);
    
        res.json({ message: 'Database initialized from json' });
      } catch (error) {
        console.error('Error initializing the database:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
}

exports.listTransactions =  async (req, res) => {

    try {
        const { month } = req.query; 
    
        const transactions = await Products.aggregate([
          {
            $match: {
              $expr: {
                $eq: [{ $month: '$dateOfSale' }, parseInt(month)],
              },
            },
          },
        ]);
    
        if (transactions.length === 0) {
          return res.status(404).json({ message: 'No transactions found for the selected month.' });
        }
    
        res.json(transactions);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
      }
    
    
    };
      
exports.transactionStatistics = async (req,res)=>{
    try {
        const { month } = req.query; 

    const totalSaleAmount = await Transaction.aggregate([
      {
        $match: {
          dateOfSale: {
            $gte: new Date(`2021-${month}-01`),
            $lt: new Date(`2022-${month}-01`),
          },
        },
      },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: '$price' },
        },
      },
    ]);

    const totalSoldItems = await Transaction.countDocuments({
      dateOfSale: {
        $gte: new Date(`2021-${month}-01`),
        $lt: new Date(`2022-${month}-01`),
      },
    });

    const totalNotSoldItems = await Transaction.countDocuments({
      dateOfSale: {
        $gte: new Date(`2021-${month}-01`),
        $lt: new Date(`2022-${month}-01`),
      },
    });

    res.json({
      totalSaleAmount: totalSaleAmount.length > 0 ? totalSaleAmount[0].totalAmount : 0,
      totalSoldItems,
      totalNotSoldItems,
    });
    
    } catch (error) {
        console.error(error);
    }
}

exports.barChartData = async (req,res)=>{

    try {
        const { month } = req.query; 
    
        const priceRanges = [
          { min: 0, max: 100 },
          { min: 101, max: 200 },
          { min: 201, max: 300 },
          { min: 301, max: 400 },
          { min: 401, max: 500 },
          { min: 501, max: 600 },
          { min: 601, max: 700 },
          { min: 701, max: 800 },
          { min: 801, max: 900 },
          { min: 901, max: Number.MAX_SAFE_INTEGER }, 
        ];
    
        const barChartData = [];
    
        for (const range of priceRanges) {
          const itemsInPriceRange = await Products.countDocuments({
            dateOfSale: {
              $gte: new Date(`2021-${month}-01`), 
              $lt: new Date(`2022-${month}-01`), 
            },
            price: { $gte: range.min, $lte: range.max },
          });
    
          barChartData.push({
            priceRange: `${range.min}-${range.max}`,
            itemCount: itemsInPriceRange,
          });
        }
    
        res.json(barChartData);
      } catch (error) {
        console.error(error);
      }

}

exports.pieChartData = async (req,res)=>{
    try {
        const { month } = req.query; 
    
        const pieChartData = await Products.aggregate([
          {
            $match: {
              dateOfSale: {
                $gte: new Date(`2021-${month}-01`),
                $lt: new Date(`2022-${month}-01`),
              },
            },
          },
          {
            $group: {
              _id: '$category',
              itemCount: { $sum: 1 },
            },
          },
          {
            $project: {
              _id: 0,
              category: '$_id',
              itemCount: 1,
            },
          },
        ]);
    
        res.json(pieChartData);
      } catch (error) {
        console.error(error);
      }
}