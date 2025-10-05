import Item from "../models/itemModel.js";

export const createItem = async(req, res) => {
    try {
        console.log('Creating item:', req.body);
        const newItem = new Item(req.body);
        await newItem.save();
        res.status(201).json(newItem);
    }
    catch(error) {
        console.error('Create error:', error);
        res.status(500).json({message: error.message});
    }
};

export const getApprovedItems = async(req, res) => {
    try {
        const items = await Item.find({status: "Approved"});
        console.log('Approved items:', items);
        res.json(items);
    }
    catch(error) {
        res.status(500).json({message: error.message});
    }
};

export const getPending = async(req, res) => {
    try {
        const items = await Item.find({status: "Pending Approval"});
        res.json(items);
    }
    catch(error) {
        res.status(500).json({message: error.message});
    }
};

export const updateStatus = async(req, res) => {
    try {
        const {status} = req.body;
        const updatedItem = await Item.findByIdAndUpdate(
            req.params.id,
            {status},
            {new: true}
        );
        
        if (!updatedItem) {
            return res.status(404).json({ message: "Item not found" });
        }
        
        console.log(`Item "${updatedItem.title}" changed to ${status}`);
        res.json(updatedItem);
    }
    catch(error) {
        res.status(500).json({message: error.message});
    }
};

export const claimItem = async (req, res) => {
    try {
        const { claimantName, claimantContact, claimantId } = req.body;
        
        if (!claimantName || !claimantContact) {
            return res.status(400).json({ message: "Claimant name and contact are required" });
        }
        
        const claimedItem = await Item.findByIdAndUpdate(
            req.params.id,
            { 
                status: "Claimed", 
                claimantId: claimantId || "anonymous",
                claimantName: claimantName,
                claimantContact: claimantContact,
                dateClaimed: new Date() 
            },
            { new: true }
        );
        
        if (!claimedItem) {
            return res.status(404).json({ message: "Item not found" });
        }
        
        console.log(`Item claimed by ${claimantName}: ${claimedItem.title}`);
        res.json(claimedItem);
    }
    catch(error) {
        res.status(500).json({message: error.message});
    }
};
