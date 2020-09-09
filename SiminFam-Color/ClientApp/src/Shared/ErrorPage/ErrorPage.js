import React from 'react';

const ErrorPage = props => {
    return (
        <React.Fragment>
            <div style={{ textAlign: "center" , padding: 'auto' }}>
                <h1>!! خطا</h1>
                <h6>صفحه مورد نظر پیدا نشد</h6>
            </div>
        </React.Fragment>
    )
}

export default ErrorPage;