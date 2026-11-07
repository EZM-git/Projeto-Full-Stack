import express, { type Request, type Response } from 'express';
import cors from 'cors';

const app = express();
app.use(cors());

enum State {
    MG = 'Minas Gerais',
    SP = 'São Paulo',
    RJ = 'Rio de Janeiro'
}

interface IProdutos {
    id: number;
    name: string;
    state: State;
}

let produts: IProdutos[] = [];

app.get('/produtos', (req: Request, res: Response) => {
    const { estado } = req.query;

    if (estado) {
        const filtrados = produts.filter( produto => produto.state === estado);
        return res.json(filtrados);
    }

    produts.push(
        {
            id: 1,
            name: 'Product 1',
            state: State.MG
        },
        {
            id: 2,
            name: 'Product 2',
            state: State.SP
        },
        {
            id: 3,
            name: 'Product 3',
            state: State.RJ
        }
    );

    return res.json(produts);
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
