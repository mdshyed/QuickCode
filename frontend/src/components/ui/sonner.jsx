import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner";

const Toaster = ({
  ...props
}) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme}
      className="toaster group"
      style={{
        "--normal-bg": "#151515",
        "--normal-text": "#fff",         
        "--normal-border": "#333"        
      }}
      {...props}
    />
  );
}

export { Toaster }