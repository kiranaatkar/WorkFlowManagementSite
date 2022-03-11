function SideBarHeader(props) {
  function getGreetingMessage() {
    if (props.user) {
      const now = new Date();
      const curHr = now.getHours();
      if (curHr < 12) {
        return 'Good Morning!';
      } else if (curHr < 17) {
        return 'Good Afternoon!';
      } else {
        return 'Good Evening!';
      }
    } else {
      return 'Login to see Projects.';
    }
  }

  return (
    <header>
      <div className='image-text'>
        <span className='image'>
          <img src='logo.png' alt='' />
        </span>

        <div className='text logo-text'>
          <span className='name'>
            {props.user ? `${props.user.split('@')[0]}` : 'Very Good'}
          </span>
          <span className='profession'>{getGreetingMessage()}</span>
        </div>
      </div>
      <i
        className='bx bx-chevron-right toggle'
        onClick={() => props.toggleNavBar('toggle')}></i>
    </header>
  );
}

export default SideBarHeader;
