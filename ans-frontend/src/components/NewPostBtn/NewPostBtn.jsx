import "./NewPostBtn.scss";

export default function NewPostBtn({ openModal }) {
  // On click open modal for AddPost
  return (
    <div className="newPostBtn" onClick={openModal}>
      <svg
        width="50"
        height="50"
        viewBox="0 0 50 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M38.2412 8.64853L3.12773 43.8484L1 48.9994L6.15095 46.8716L41.3508 11.7582L38.2412 8.64853ZM45.2669 1.62404L43.7457 3.14404L46.8553 6.2537L48.3766 4.73242C48.7758 4.33295 49 3.79134 49 3.22662C49 2.6619 48.7758 2.12028 48.3766 1.72081L48.2798 1.62404C48.082 1.4262 47.8472 1.26926 47.5887 1.16218C47.3302 1.05511 47.0532 1 46.7734 1C46.4936 1 46.2166 1.05511 45.9581 1.16218C45.6996 1.26926 45.4648 1.4262 45.2669 1.62404Z"
          fill="white"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
