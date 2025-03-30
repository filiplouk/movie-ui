import classes from "./Badge.module.scss";

type BadgeProps = {
  variant?: "grey" | "purple";
  children: React.ReactNode;
};

const Badge = ({ variant = "purple", children }: BadgeProps) => {
  return (
    <div className={`${classes.badge} ${classes[variant]} text-12`}>
      {children}
    </div>
  );
};

export default Badge;
