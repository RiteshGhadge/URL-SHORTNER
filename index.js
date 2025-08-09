const express = require('express');
const app = express();
const urlRouter = require("./Routes/url");
const {connecToMongoDb} = require("./connect");
const URL = require('./models/url');

// Add EJS setup
app.set('view engine', 'ejs');
app.use(express.static('public'));

connecToMongoDb('mongodb+srv://riteshghadge205:brV2W0ztbxkAmqGO@cluster0.nwefcbm.mongodb.net/')
.then(() => console.log("mongodb connected"));

app.use(express.json());

app.use('/url', urlRouter);

app.get('/:shortId', async (req, res) => {
    const shortId = req.params.shortId;
    
    const entry = await URL.findOneAndUpdate(
        { ShortId: shortId },  // Changed from shortID to ShortId
        {
            $push: {
                visitHistory: {
                    timestamp: Date.now(),
                }
            }
        }
        
    );
    if (!entry) {
        return res.status(404).json({ error: 'URL not found' });
    }

    res.redirect(entry.redirectURL); 
});

// Update root route to render the form
app.get('/', (req, res) => {
    res.render('index');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

