import express, { type Request, type Response } from 'express';
import cors from 'cors';
// npm --prefix server run dev
// IA
const port = Number(process.env.PORT);
if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error('PORT deve ser um número inteiro entre 1 e 65535.');
}

const corsOrigin = process.env.CORS_ORIGIN?.trim();
if (!corsOrigin) {
    throw new Error('CORS_ORIGIN precisa ser configurada.');
}

const parsedCorsOrigin = new URL(corsOrigin);
if (
    !['http:', 'https:'].includes(parsedCorsOrigin.protocol) ||
    parsedCorsOrigin.origin !== corsOrigin
) {
    throw new Error('CORS_ORIGIN deve conter apenas uma origem, sem caminho.');
}

const app = express();
app.use(cors({ origin: corsOrigin }));
// Fim IA

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

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
