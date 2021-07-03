// Next.js API route support: https://nextjs.org/docs/api-routes/introduction


const users = [{
	name: "Claudia Lewin",
	permalink: "abg-claudia-lewin",
	photo: "https://media-exp3.licdn.com/dms/image/C4D03AQErYA_Z8MqvAA/profile-displayphoto-shrink_800_800/0/1621239308415?e=1630540800&v=beta&t=gq5F5IFxDUF9iQP1W3P_ZnU9eHbXguAczpRFs128C2c",
	linkedin: "https://www.linkedin.com",
  companyname: "ABG REAL ESTATE GROUP",
	phone: "+491774871153",
  location: "Berlin, Deutschland",
  email: "claudia.lewin@abg-group.de",
  address: "Kurfuntendamm 22, 10719, Berlin, Germany",
  titlesmall: "MIRCS",
  title: "Senior Projektmanagerin",
  aboutme: "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...",
	custom: [{
		name: "Personal Website",
		url: "https://www.google.com"
	}, {
		name: "Corporate Website",
		url: "http://www.abg.com"
  }]
},{
	name: "Javier Wasserman",
	permalink: "freelancer-javier-wasserman",
	photo: "https://via.placeholder.com/150",
	linkedin: "https://www.linkedin.com",
  companyname: "Freelancer",
  title: "Full Stack Dev Entrepreneur",
  aboutme: "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...",
  location: "Berlin, Deutschland",
	phone: "+491774871153",
	custom: [{
	name: "Personal Website",
		url: "http://www.google.com"
	}, {
		name: "Corporate Website",
		url: "http://www.abg.com"
	}]
}]

 
export default function data(req, res) {
  res.json(users)
}
