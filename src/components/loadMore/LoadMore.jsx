import PropTypes from 'prop-types';
import styles from './loadMore.module.css';

function LoadMore({ onButtonClick }) {
  return (
    <div className={styles.LoaderMoreContainer}>
      <button className={styles.LoaderMoreBtn} type="button" onClick={onButtonClick}>
        Load more
      </button>
    </div>
  );
}

export default LoadMore;

LoadMore.propTypes = {
  onButtonClick: PropTypes.func,
};