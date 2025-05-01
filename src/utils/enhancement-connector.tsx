export const connect = <P, T>(
  mapToProps: (props: T) => Partial<P>,
  Component: React.ComponentType<P>,
) => {
  return function EnhancedComponent(props: T) {
    const mappedProps = mapToProps(props);
    return <Component {...(mappedProps as P as any)} />;
  };
};
