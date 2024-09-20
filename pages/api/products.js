import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

export default async function handle(req, res) {

    const { method } = req;

    await mongooseConnect()
    // Create Product
    if (method === "POST") {
        const { title, description, price, images } = req.body
        const productDoc = await Product.create({
            title, description, price, images
        })
        res.json(productDoc);
    }

    if (method === "GET") {
        if (req.query?.id) {
            let data = await Product.findById(req.query.id)
            res.json(data);
        } else {
            res.json(await Product.find());
        }
    }

    if (method == "PUT") {
        const { title, description, price, images, _id } = req.body
        await Product.updateOne({
            _id
        }, {
            title, description, price, images
        })
        res.json(true)
    }

    if (method === "DELETE") {
        if (req.query?.id) {
            try {
                const result = await Product.findOneAndDelete({ _id: req.query?.id });
                if (!result) {
                    console.log('No document was deleted. It might not exist.');
                } else {
                    console.log('Deleted product:', result);
                    res.json({ message: "Deleted" })
                    res.json(true)
                }
            } catch (error) {
                console.error('Error deleting product:', error);
                res.json({ error: "Deleted" })
                res.json(true)
            }
        }
    }
} 