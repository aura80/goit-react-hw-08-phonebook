import { useSelector } from "react-redux";
import { selectAuth } from "../redux/authSlice";

const ReduxStateViewer = () => {
    const auth = useSelector(selectAuth);

    return (
      <div>
        <h3>Redux State Content</h3>
        <pre>{JSON.stringify(auth.user, null, 2)}</pre>
      </div>
    );
};

export default ReduxStateViewer;
