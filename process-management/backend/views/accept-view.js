exports.acceptView = (boardName, frontendHost) => {
  return `<div>
<span><strong>You are successfully add to board - ${boardName}. </strong><br />
    Please click below link to log in application.<br /><br /><br />
    <a href="${frontendHost}">Click Here to visit Application</a>
</div>`;
};
