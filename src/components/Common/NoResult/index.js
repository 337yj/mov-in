import styles from "./noResult.module.scss";
const NoResult = ({ text }) => {
  return (
    <section className={styles.wrapper}>
      <h1 className={styles.main}>
        '<span>{text}</span>'에 대한 검색 결과가 없습니다.
      </h1>
      <p>도움이 필요하신가요?</p>
      <ul>
        <li>단어나 문장이 정확한지 확인해보세요.</li>
        <li>오타가 없는지 확인해보세요.</li>
        <li>검색어의 단어 수를 줄이거나, 다른 검색어로 검색해보세요. </li>
        <li>sample@gmail.com으로 메일을 보내주세요.</li>
      </ul>
    </section>
  );
};

export default NoResult;
