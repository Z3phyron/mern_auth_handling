import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

`
const Wrapper = styled.div`
   width: 300px;
   text-align: center;
   margin: auto;

`

const Welcome = () => {
const navigate = useNavigate()

    useEffect(() => {
      setTimeout(() => {
        navigate('/')
      }, 3000);
    })


    return (
        <Container>
            <Wrapper>
                <h1>Welcome</h1>
                <p>Please check your email for details on accont verification</p>
           </Wrapper>
        </Container>
    );
}

export default Welcome;