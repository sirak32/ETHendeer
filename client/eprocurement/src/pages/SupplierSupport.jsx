import styled from "styled-components";
import { ScrollTop } from 'primereact/scrolltop';
import { useEffect } from "react";
import { useNavigate } from "react-router";
import Side from '../components/supplier/Dashboard/SupSide'
import { Panel } from 'primereact/panel';
import { Ripple } from 'primereact/ripple';


const App = () => {
  const navigate=useNavigate()

  useEffect(()=>{
    const role=localStorage.getItem('role')
    if(role!=='supplier')
    navigate('/')
  },[])
  const menus=['Dashboard','Tenders','Profile','Help & Support']
  const template = (options) => {
    const toggleIcon = options.collapsed ? 'pi pi-chevron-down' : 'pi pi-chevron-up';
    const className = `${options.className} justify-content-start`;

    return (
        <div className={className}>
            <button className={options.togglerClassName} onClick={options.onTogglerClick}>
                <span className={toggleIcon}></span>
                <Ripple />
            </button>
            <span className='text-3xl'>
            How To Apply For A Tender?
            </span>
        </div>
    )
}
const template2 = (options) => {
  const toggleIcon = options.collapsed ? 'pi pi-chevron-down' : 'pi pi-chevron-up';
  const className = `${options.className} justify-content-start`;

  return (
      <div className={className}>
          <button className={options.togglerClassName} onClick={options.onTogglerClick}>
              <span className={toggleIcon}></span>
              <Ripple />
          </button>
          <span className='text-3xl'>
          How To Register As A Supplier?
          </span>
      </div>
  )
}
  return (
    <Div>
      <Side active={3} menu={menus} />
      <Section>
        <div className="grid">
          <div className="row__one">
          <Panel headerTemplate={template} toggleable>
              <p>
1. First select tender that is you are interested to apply.</p>
<p>2. Then pay for the bid document by clicking "Buy bid" button. </p>
<p>3. The system will redirect you to e-payment page.</p>
<p>4. Login to your "Yenepay" account.</p>
<p>5. Select e-banking provider</p>
<p>6. pay for the document </p>
<p>7. Then return to the tender page</p>
<p>8. Click "Apply button" on tender which you pay for its bid document</p>
<p>9. Attach bid value with pdf format on the first attachment button.</p>
<p>10. Attach Technical document ( bank CPO, tax clearance ) by making them as one pdf file on second attachment button.</p>
<p>11. Click "APPLY" button.</p>
            </Panel>
            <Panel headerTemplate={template2} toggleable>
<p>1. First click on register tab </p>
<p>2. Provide full information on the registration form with your valid data</p>
<p>3. Click submit button</p>
<p>4. Wait for the approval of your registration( validity of your documents) by admins</p>
<p>5. After approval you will receive announcement on your email</p>
<p>6. Finally you can login to the system </p>
            </Panel>
            <ScrollTop/>
          </div>
          <div className="row__two"></div>
        </div>
      </Section>
    </Div>
  );
};
const Div = styled.div`
  position: relative;
`;
const Container = styled.div`
  display: flex;
  height: 97vh;
  background: linear-gradient(to bottom right, white 0% #e6e4ff 70%);
  border-radus: 2rem;
  @media screen and (min-width: 320px) and (max-width: 1080px) {
    flex-direction: column;
  }
`;
const Section = styled.section`
  margin-left: 18vw;
  padding: 2rem;
  height: 100%;
  .grid {
    display: flex;
    flex-direction: column;
    height: 100%;
    gap: 1rem;
    margin-top: 2rem;
    .row__one {
      display: grid;
      /* grid-template-columns: repeat(2, 1fr); */
      height: 50%;
      gap: 1rem;
    }
    .row__two {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1rem;
      height: 50%;
    }
  }
  @media screen and (min-width: 280px) and (max-width: 1080px) {
    margin-left: 0;
    .grid {
      .row__one,
      .row__two {
        grid-template-columns: 1fr;
      }
    }
  }
`;

export default App;
