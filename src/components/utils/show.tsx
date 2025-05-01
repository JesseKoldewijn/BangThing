interface ShowProps {
  when: boolean;
  fallback?: React.ReactNode;
  children: React.ReactNode;
}

/**
 * The `Show` component conditionally renders its children based on the value of the `when` prop.
 * @param {ShowProps}  - The `Show` component takes two props: `when` and `children`.
 * @returns The `Show` component is returning the `children` only if the `when` prop is true, otherwise
 * it returns `null`.
 */
export const Show = ({ when, fallback, children }: ShowProps) => {
  return <>{when ? children : (fallback ?? null)}</>;
};
