import { useParams } from "react-router-dom";
import { Container,ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const BankDetails = ({ data }) => {
    const { ifsc_code } = useParams();
    console.log(data);
    return(
        <Container style={{marginTop: 35}}>
            <h3><strong>{data.bank_name}</strong></h3>
            <ListGroup style={{marginTop:50}}>
                <ListGroupItem>
                    <ListGroupItemHeading>Branch</ListGroupItemHeading>
                    <ListGroupItemText>{data.branch} </ListGroupItemText>
                </ListGroupItem>
                <ListGroupItem>
                    <ListGroupItemHeading>IFSC</ListGroupItemHeading>
                    <ListGroupItemText>{data.ifsc} </ListGroupItemText>
                </ListGroupItem>
                <ListGroupItem>
                    <ListGroupItemHeading>Bank ID</ListGroupItemHeading> 
                    <ListGroupItemText>{data.bank_id}</ListGroupItemText>
                </ListGroupItem>
                <ListGroupItem>
                    <ListGroupItemHeading>Address</ListGroupItemHeading> 
                    <ListGroupItemText>{data.address}</ListGroupItemText>
                </ListGroupItem>
            </ListGroup>
        </Container>
    )
}

export default BankDetails;