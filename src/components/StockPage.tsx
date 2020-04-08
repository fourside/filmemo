import React, { useEffect, useState } from 'react';
import Container from '@material-ui/core/Container';
import { Stock } from '../model/Stock';
import { listStock } from '../amplify/API';

interface State {
  stockList: Stock[];
  processing: boolean;
}
const StockPage: React.FC = () => {
  const [state, setState] = useState<State>({
    stockList: [],
    processing: false,
  });

  useEffect(() => {
    (async () => {
      try {
        setState(prev => {
          return {
            ...prev,
            processing: true,
          };
        });
        const stockList = await listStock();
        setState(prev => {
          return {
            ...prev,
            stockList,
            processing: false,
          };
        });
      } catch (err) {
        console.log(err);
        setState(prev => {
          return {
            ...prev,
            processing: false,
          };
        });
      }
    })();
  }, []);

  return (
    <Container maxWidth="lg">
      {state.stockList.map(stock => (
        <div key={stock.id}>{stock.imdbID}</div>
      ))}
    </Container>
  );
};

export default StockPage;
