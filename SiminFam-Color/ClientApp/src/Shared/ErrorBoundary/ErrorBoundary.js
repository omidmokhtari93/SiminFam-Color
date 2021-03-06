import React from "react";
import styles from './ErrorBoundary.module.scss';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    })
  }

  render() {
    if (this.state.errorInfo) {
      return (
        <div className={styles.errorPage}>
          <h1 className="text-center">⚠</h1>
          <h4 className="text-center mb-0">
            ...خطایی در نرم افزار رخ داده است
            <br />
            <br />
            ...لطفا با پشتیبان نرم افزار تماس بگیرید
          </h4>
          <div className="p-4 text-center">
            <button onClick={() => window.location.href = '/'}
              className="btn btn-primary">راه اندازی دوباره نرم افزار</button>
          </div>
          <div className="text-center">
            {this.state.error && this.state.error.toString()}
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;