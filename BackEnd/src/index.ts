import express, { type Request, type Response } from 'express';
import cors from 'cors';

const app = express();
app.use(cors());


interface IProdutos {
    id: number;
    name: string;
    price: number
}

let produts: IProdutos[] = [];

app.get( "/produtos" , (req: Request, res: Response) => {
    const { estado } = req.query;

    produts.push(
        {
            id: 1,
            name: 'Product 1',
            price: 2.5
        },
        {
            id: 2,
            name: 'Product 2',
            price: 2.5
        },
        {
            id: 3,
            name: 'Product 3',
            price: 2.5
        }
    );

    return res.json(produts);
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
