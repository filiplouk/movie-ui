type ButtonProps = {
  label?: string;
  children: React.ReactNode;
};

const Button = ({ children }: ButtonProps) => {
  return (
    <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
      {children}
    </button>
  );
};

export default Button;
