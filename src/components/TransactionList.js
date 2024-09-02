import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TransactionList = () => {
    const [transactions, setTransactions] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post(
                    'https://streaming.bitquery.io/graphql',
                    {
                        query: `
                            {
                                ethereum {
                                    dexTrades(
                                        options: {desc: "timeInterval.minute"}
                                        date: {since: "2021-01-01"}
                                    ) {
                                        baseCurrency {
                                            symbol
                                        }
                                        quoteCurrency {
                                            symbol
                                        }
                                        tradeAmount(in: USD)
                                        timeInterval {
                                            minute(count: 1)
                                        }
                                    }
                                }
                            }
                        `
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'X-API-KEY': process.env.REACT_APP_BITQUERY_API_KEY
                        }
                    }
                );
                console.log('Recent Transactions:', response.data.data.ethereum.dexTrades);
                setTransactions(response.data.data.ethereum.dexTrades);
            } catch (error) {
                console.error('Error fetching transactions:', error);
                setError(error);
            }
        };

        fetchData();
    }, []);

    if (error) return <div>Error loading transactions</div>;

    return (
        <div>
            <h2>Recent Transactions</h2>
            <ul>
                {transactions.map((transaction, index) => (
                    <li key={index}>
                        {transaction.baseCurrency.symbol} to {transaction.quoteCurrency.symbol}: {transaction.tradeAmount} at {transaction.timeInterval.minute}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TransactionList;
