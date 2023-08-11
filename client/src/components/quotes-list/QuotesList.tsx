import { type HTMLProps, type FC, useState, useEffect } from 'react';
import styles from './QuotesList.module.css';
import { API_URL } from '../../configs/app.config';

type TQuotesListProps = HTMLProps<HTMLUListElement> 

interface IQuote {
  id: string;
  author: string;
  quote: string;
}

const QuotesList: FC<TQuotesListProps> = () => {
  const [quotes, setQuotes] = useState<IQuote[]>([]);

  const getQuotes = async () => {
    return await fetch(`${API_URL}/quotes`).then((res) => res.json());
  };

  useEffect(() => {
    getQuotes().then((res) => setQuotes(res.quotes));
  }, []);

  return (
    <ul className={styles.list}>
        {quotes &&
          quotes.map((item) => (
            <li key={item.id}>
              <blockquote className={styles.list__quote}>
                <p>{item.quote}</p>
                <footer>- {item.author}</footer>
              </blockquote>
            </li>
          ))}
      </ul>
  );
};

export { QuotesList };