import styles from '../components/components.module.css';
import Card from '../components/card/card';
import Transactions from '../components/transactions/transactions';
import Chart from '../components/chart/chart';

const DashboardPage = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <div className={styles.cards}>
          <Card />
          <Card />
          <Card />
        </div>
        <Transactions />
        <Chart />
      </div>
    </div>
  );
};

export default DashboardPage;
