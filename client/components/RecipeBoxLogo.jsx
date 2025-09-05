const RecipeBoxLogo = (props) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M50 15C55 25 65 30 70 20"
      stroke="#40C057"
      strokeWidth="5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="45" cy="30" r="8" fill="#FAB005" />
    <circle cx="60" cy="38" r="6" fill="#FA5252" />

    <path
      d="M20 90V45C20 42.2386 22.2386 40 25 40H75C77.7614 40 80 42.2386 80 45V90H20Z"
      fill="#495057"
    />
  </svg>
);

export default RecipeBoxLogo;
