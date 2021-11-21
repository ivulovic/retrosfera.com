import { LoadingIndicator } from 'app/components/LoadingIndicator';

export const CenteredLoading = props => (
  <div className="text-center" style={props.style}>
    <LoadingIndicator />
  </div>
);
