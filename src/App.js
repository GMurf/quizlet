import {useState, useEffect, useCallback } from 'react'
import {BiCalendar, BiTrash} from 'react-icons/bi';
import Search from './Components/Search';
import AddAppointment from './Components/AddAppointment'
import AppointmentInfo from './Components/AppointmentInfo'
import Modal from './Components/Modal'


function App() {
let [appointmentList, setAppointmentList] = useState([]); 
let [query, setQuery] = useState('');
let [sortBy, setSortBy] = useState('petName');
let [orderBy, setOrderBy] = useState('asc');
let [showModal, setShowModal] = useState(false)
let [cardToggle, setCardToggle] = useState(false)
		
		

const filteredAppointments = appointmentList.filter(
	filtered => {
			if(query== ''){
				return;
			}
		return (
		
			filtered.petName.toLowerCase().includes(query.toLowerCase()) ||
			filtered.ownerName.toLowerCase().includes(query.toLowerCase()) ||
			filtered.aptNotes.toLowerCase().includes(query.toLowerCase())
			)
	}
	).sort((a,b) =>
	{			let order = (orderBy == 'asc') ? 1 : -1;
				return (
					
					
					a[sortBy].toLowerCase() < b[sortBy].toLowerCase()
						?
							-1 * order : 1 * order
					
					
				)
	})

const fetchData = useCallback(() => {
	fetch('/data.json')
		.then(response => response.json())
		.then(data => {
			setAppointmentList(data)
		});
}, []);

useEffect(() => {
	fetchData()
	
}, [fetchData]);

const modal = showModal && <Modal  flipCard={()=>setCardToggle(!cardToggle)} cardToggle ={cardToggle} onHideModal={()=>setShowModal(false)} />

 return (
 <>
 
	 {modal}
	 <button onClick= {()=>setShowModal(true)}>
		show modal
	 </button>
    <div className="App p-10 container mx-auto mt-3 font-thin">
      <h1 className="text-5xl mb-3" >
	  <BiCalendar className="inline-block text-red-400" /> Quizlet! </h1>
	  <AddAppointment
			onSendAppointment={myAppointment => setAppointmentList([...appointmentList,myAppointment ])}
			lastId={appointmentList.reduce((max, item) => Number(item.id) > max ? Number(item.id):max,0)}
			/>
<Search query = {query} onQueryChange = {myQuery => setQuery(myQuery)}
				orderBy={orderBy}
				onOrderByChange= {myOrder => setOrderBy(myOrder)}
				sortBy= {sortBy}
				onSortByChange= {mySort => setSortBy(mySort)}
			/>
	  <ul className="divide-y divide-gray-200">
	  {filteredAppointments
		.map(appointment => (
			<AppointmentInfo key={appointment.id}
				appointment={appointment}
				
				onDeleteAppointment ={(appointmentId)=>
				   setAppointmentList(appointmentList.filter(appointment => appointment.id !== appointmentId))
				}/>
		))
	  
	  }
	  </ul>
	</div>
	
	</>
  );
}

export default App;
