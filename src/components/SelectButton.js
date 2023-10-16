
const SelectButton = ({ children, selected, onClick }) => {

  return (
    <span onClick={onClick} className="">
      {children}
    </span>
  );
};

export default SelectButton;