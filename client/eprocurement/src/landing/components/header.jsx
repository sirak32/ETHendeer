import ParticlesBg from "particles-bg";

export const Header = (props) => {
  return (
    <header id='header'>
      <div className='intro'>
        <ParticlesBg type='circle' bg={{zIndex: 0, position:"absolute", top:0}} />
        <div className='overlay'>
          <div className='container'>
          
            <div className='row'>
              <div className='col-md-8 col-md-offset-2 intro-text'>
                <h1>
                  {props.data ? 'apply @ Home' : 'Loading'}
                  <span></span>
                </h1>
                <p>{props.data ?'you can sign up as a supplier @ home and apply everywhere you are using our electronic procurement system' : 'Loading'}</p>
                <a
                  href='#features'
                  className='btn btn-custom btn-lg page-scroll'
                >
                  Get Started
                </a>{' '}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
