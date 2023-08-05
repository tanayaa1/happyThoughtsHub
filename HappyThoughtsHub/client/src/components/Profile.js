import React, { useEffect, useState } from "react";
import "./Profile.css";
import { Link, useParams } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

function Profile() {
	const { user } = useAuthContext();

	const [doctorData, setDoctorData] = useState();
	//   const [loading, setLoading] = useState(true);
	const { _id } = useParams();
	console.log(_id);

	useEffect(() => {
		if (user) {
			fetch(`http://localhost:4000/api/doctor/${_id}`, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${user.token}`,
				},
			})
				.then((res) => res.json())
				.then((jsonRes) => {
					setDoctorData(jsonRes);
					console.log(jsonRes);
					// setIsLoading(false);
					// setOpen(!open);
				});
		}
	}, [user]);
	console.log(doctorData);

	return (
		<div className="myprofile">
			<div className="page-content page-container" id="page-content">
				<div className="padding">
					<div className="row container d-flex justify-content-center">
						<div className="col-xl-6 col-md-12">
							<div className="card user-card-full">
								<div className="row m-l-0 m-r-0">
									<div className="col-sm-4 bg-c-lite-purple-blue user-profile">
										<div className="card-block text-center text-white">
											<div className="m-b-25">
												<img
													src="https://img.icons8.com/bubbles/100/000000/user.png"
													className="img-radius"
													alt="User-Profile-Image"
												></img>
											</div>
											<h6 className="f-w-600">{user && user.name}</h6>
											<p>{user && user.role}</p>
											<div className="">
												<h6 className="text-muted f-w-400">
													<Link to={`/doctor/edit/${_id}`}>
														<button className="">
															<span>Edit Profile</span>
														</button>
													</Link>
												</h6>
											</div>
											<i className=" mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"></i>
										</div>
									</div>
									<div className="col-sm-8">
										<div className="card-block">
											<h6 className="m-b-20 p-b-5 b-b-default f-w-600">
												Details
											</h6>
											<div className="row">
												<div className="col-sm-6">
													<p className="m-b-10 f-w-600">Email</p>
													<h6 className="text-muted f-w-400">
														{user && user.email}
													</h6>
												</div>
												<div className="col-sm-6">
													<p className="m-b-10 f-w-600">Speciality</p>
													<h6 className="text-muted f-w-400">
														{doctorData && doctorData.speciality}
													</h6>
												</div>
											</div>
											<h6 className="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">
												Projects
											</h6>
											<div className="row">
												<div className="col-sm-6">
													<p className="m-b-10 f-w-600">Posts</p>
													<h6 className="text-muted f-w-400">
														<Link to="/chat">
															<button className="but1">
																<span>View Posts</span>
															</button>
														</Link>
													</h6>
												</div>
												<div className="col-sm-6">
													<p className="m-b-10 f-w-600">Appointments</p>
													<h6 className="text-muted f-w-400">
														<Link to={`/appointments/${_id}`}>
															<button className="but1">
																<span>Appointments</span>
															</button>
														</Link>
													</h6>
												</div>
											</div>
											<ul className="social-link list-unstyled m-t-40 m-b-10">
												<li>
													<a
														href="#!"
														data-toggle="tooltip"
														data-placement="bottom"
														title=""
														data-original-title="facebook"
														data-abc="true"
													>
														<i
															className="mdi mdi-facebook feather icon-facebook facebook"
															aria-hidden="true"
														></i>
													</a>
												</li>
												<li>
													<a
														href="#!"
														data-toggle="tooltip"
														data-placement="bottom"
														title=""
														data-original-title="twitter"
														data-abc="true"
													>
														<i
															className="mdi mdi-twitter feather icon-twitter twitter"
															aria-hidden="true"
														></i>
													</a>
												</li>
												<li>
													<a
														href="#!"
														data-toggle="tooltip"
														data-placement="bottom"
														title=""
														data-original-title="instagram"
														data-abc="true"
													>
														<i
															className="mdi mdi-instagram feather icon-instagram instagram"
															aria-hidden="true"
														></i>
													</a>
												</li>
											</ul>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Profile;
