import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Phone, Instagram, Linkedin } from 'lucide-react';

const Contact = () => {
  const teams = [
    {
      title: 'Dean',
      members: [
        {
          name: 'Dr. MD Asif',
          position: 'Dean - Student Affairs',
          image: '/Team/asif.jpg',
          phone: '+91 97015 26805',
          instagram: '',
          linkedin: 'https://www.linkedin.com/in/dr-asif-md-344139212/',
        },
      ],
    },
    {
      title: 'Associate Deans',
      members: [
        {
          name: 'Dr. C. Padmini',
          position: 'Associate Dean',
          image: '/Team/pd-asd.jpeg',
          phone: '+91 91009 40551',
          instagram: 'https://www.instagram.com/padminicheerla/',
          linkedin: 'https://www.linkedin.com/in/dr-padmini-cheerla-6194ab43/',
        },
        {
          name: 'Dr N. Srinivas',
          position: 'Associate Dean ',
          image: '/Team/ns-asd.jpg',
          phone: '+91 99894 83439',
          instagram: '',
          linkedin: 'https://www.linkedin.com/in/srinivas-nakka-98b84b93/',
        },
      ],
    },
    {
      title: 'Tech Team',
      members: [
        { name: 'Ajay Kanneboina', image: '/Team/AJAY KANNEBOINA.jpg', phone: '9948050853', instagram: 'https://www.instagram.com/ajaykanneboina11?igsh=ZTNhM2xyaHFidjlo', linkedin: 'https://www.linkedin.com/in/ajay-kanneboina' },
        { name: 'Yashwanth Adimulam', image: '/Team/Yashwanth.jpg', phone: '7702596334', instagram: 'https://www.instagram.com/yashwanth__adimulam', linkedin: 'https://www.linkedin.com/in/yashwanth-adimulam' },
        { name: 'Yasaswini Prathipati', image: '/Team/Yasaswini.jpg', phone: '9160883773', instagram: 'https://www.instagram.com/craftywhimsy?utm_source=ig_web_button_share_sheet&igsh=MTdmaDYxcGg1N2x3NQ==', linkedin: 'https://www.linkedin.com/in/yasaswini-prathipati-7003b6327?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app' },
        { name: 'Allam Akshaya', image: '/Team/Akshaya.jpg', phone: '7093315065', instagram: 'https://www.instagram.com/akshaya_1203_', linkedin: 'https://www.linkedin.com/in/akshaya-allam-3b60092a9?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app' },
        { name: 'Aniketh Gandhari', image: '/Team/Aniketh G.jpeg', phone: '8712289614', instagram: 'https://www.instagram.com/aniketh_x', linkedin: 'https://www.linkedin.com/in/anikethgandhari' },
        { name: 'Himavardhan Reddy Venna',image: '/Team/Himavardhan.jpeg', phone: '+91 76709 47089', instagram: 'https://www.instagram.com/vennahimavardhanreddy/',linkedin: 'https://www.linkedin.com/in/v-himavardhan-reddy/', },
      ],
    },
    {
      title: 'Outreach Team',
      members: [
        { name: 'Sri Satya Subham Peri', image: '/Team/satya peri.jpeg', phone: '9849742507', instagram: 'https://www.instagram.com/subham_0_2?igsh=MWN5MWpxOXYxb3o5ag==', linkedin: 'https://www.linkedin.com/in/sri-satya-subham-peri-3395a7344' },
        { name: 'Ananya Charaka', image: '/Team/Ananya Charaka.jpg', phone: '9492561777', instagram: 'https://www.instagram.com/ananyacharaka?igsh=MXc3ejZsdHY4M253ag==', linkedin: 'https://www.linkedin.com/in/ananya-charaka?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app' },
        { name: 'P. Sathvika', image: '/Team/Sathwika.jpg', phone: '9346860882', instagram: 'https://www.instagram.com/__samskruthii29/profilecard/?igsh=MTdvdzhodWo5OG13ag==', linkedin: 'https://www.linkedin.com/in/pagala-sathvika-480519348?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app' },
        { name: 'Lingam Madhurya', image: '/Team/Lingam Madhurya.jpg', phone: '8919513272', instagram: 'https://www.instagram.com/madhurya_lingam?igsh=MTNsbXp6cjI5eGJnMg==', linkedin: 'https://www.linkedin.com/in/madhurya-lingam-53b5b9328?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app' },
        { name: 'Vijayakumar Arjun', image: '/Team/Arjun V.jpg', phone: '9866137575', instagram: 'https://www.instagram.com/vka.2006?igsh=azBkNHRld3FvZGVm', linkedin: 'https://www.linkedin.com/in/vijayakumar-arjun-b93819374' },
        { name: 'Mitta Tanvi', image: 'public/Team/tanvi.jpg', phone: '8328188437', instagram: 'https://www.instagram.com/tanv7170', linkedin: 'https://in.linkedin.com/in/tanvi-mitta-b17740318' },
        ],
    },
    {
      title: 'Design',
      members: [
        { name: 'Syeda Sayeeda Farhath', image: '/Team/sayeeda farhath.JPG', phone: '7981609732', instagram: 'https://www.instagram.com/ferrytheplatypus_/', linkedin: 'https://www.linkedin.com/in/sayeeda-farhath-syeda/' },
        { name: 'Mandepudi Rohith', image: '/Team/Rohith Mandepudi.jpg', phone: '7674818674', instagram: 'https://www.instagram.com/rohith_mandepudi/', linkedin: 'https://www.linkedin.com/in/mandepudi-rohith-16aa73351?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app' },
        { name: 'Mohd Rayanuddin', image: '/Team/Rayan.jpg', phone: '7416850186', instagram: 'https://www.instagram.com/m_rayan08?igsh=YTIxcTZsNXZtMXJk', linkedin: 'https://www.linkedin.com/in/rayanuddin-mohd-66bb7636a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app' },
        { name: 'Gujjari Vyshnavi', image: '/Team/Vyshnavi Gujjari.jpg', phone: '7569301125', instagram: 'https://www.instagram.com/vaishnavi22142?igsh=MW1lcWh5OWt5Nm41bQ==', linkedin: 'https://www.linkedin.com/in/vyshnavi-gujjari-148182328?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app' },
      ],
    },
    {
      title: 'Logistics',
      members: [
        { name: 'Teerthala Lohith Kumar', image: '/Team/Lohith Kumar.JPG', phone: '9618459352', instagram: 'https://www.instagram.com/_nani_lohith_19_/profilecard/?igsh=MTMxb2p0ZGF3YmNubw==', linkedin: 'https://www.linkedin.com/in/lohith-kumar-teerthala-9b04aa197?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app' },
        { name: 'Palusam Sai Manish Goud', image: '/Team/Manish palusam.jpg', phone: '9959590533', instagram: 'https://www.instagram.com/manish_palusam?igsh=cHZhbzlucTJ1MjB5', linkedin: 'https://www.linkedin.com/in/manish-palusam-252b0a322?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app' },
        { name: 'Megavath Pavan Kumar', image: '/Team/Pavan kumar Megavath.jpg', phone: '6304902078', instagram: '_Pavan_meg_', linkedin: '' },
        { name: 'Thadugula Jahnavi', image: '/Team/J T.jpg', phone: '9100742793', instagram: 'https://www.instagram.com/_jj2217_', linkedin: 'https://www.linkedin.com/in/jahnavi-thadugula' },
        { name: 'K Shiva Bhargavi', image: '/Team/bhargavi.jpg', phone: '9390523315', instagram: 'https://www.instagram.com/bhargaviiee._.08?igsh=MWxoaGs3cjhtOG1qaQ==', linkedin: 'https://www.linkedin.com/in/bhargavi-sharma-b12047256' },
      ],
    },
    {
      title: 'Social Media',
      members: [
        { name: 'Degala Aniketh', image: '/Team/Aniketh Degala.jpg', phone: '9949272364', instagram: 'https://www.instagram.com/aniketh.06/', linkedin: 'https://www.linkedin.com/in/aniketh-kanna-003677299' },
        { name: 'Vennela Priya Pothu', image: '/Team/Vennela Priya.jpg', phone: '6305245051', instagram: 'https://www.instagram.com/when_ela_07?igsh=MXQ3b3F2OWt6YTVyNg==', linkedin: 'https://www.linkedin.com/in/vennela-priya-pothu-b86885284' },
        { name: 'D. Shradha', image: '/Team/Shradha D.jpeg', phone: '9963923227', instagram: 'https://www.instagram.com/shradha_.__?igsh=MWV3YmJrdnlmdjB1dg==', linkedin: 'https://www.linkedin.com/in/shradha-domathoty-534949323' },
        { name: 'Venkat Reddy', image: '/Team/Dubba sai venkat reddy.jpg', phone: '8328416229', instagram: 'https://www.instagram.com/naniireddy_', linkedin: 'https://www.linkedin.com/in/venkat-reddy-aaa16132a' },
      ],
    },
    {
      title: 'Website Building Team',
      members: [
        { name: 'Himavardhan Reddy Venna', position: 'Lead Developer & Designer', image: '/Team/Himavardhan.jpeg', phone: '+91 76709 47089', instagram: 'https://www.instagram.com/vennahimavardhanreddy/',linkedin: 'https://www.linkedin.com/in/v-himavardhan-reddy/', },
        {
          name: 'N. Sai Saketh',
          position: 'Support & Testing',
          image: 'public/Team/Saketh.jpeg',
          phone: '+91 99123 60894',
          instagram: 'https://www.instagram.com/saketh__99__/',
          linkedin: 'https://www.linkedin.com/in/sai-saketh-nagella-13050a327/',
        },
        {
          name: 'Poojitha Ch',
          position: 'Support & Documentation',
          image: '/Team/Poojitha.jpeg',
          phone: '+91 70756 93656',
          instagram: '',
          linkedin: 'https://www.linkedin.com/in/chevulapoojitha/',
        },
      ],
    },
  ];

  return (
    <div className="relative min-h-screen">
      {/* Background Video */}
      <video
        className="fixed top-0 left-0 w-full h-full object-cover z-0"
        src="/team.mp4"
        autoPlay
        muted
        loop
        playsInline
      />

      {/* Content Overlay */}
      <div className="relative z-10">
        <Navbar />

        <div className="pt-16 bg-black/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mb-12 text-white">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Get in Touch</h1>
              <p className="text-xl max-w-3xl mx-auto">
                Meet the passionate team working behind the scenes to make your student journey vibrant and engaging.
              </p>
            </div>

            {/* Team Cards */}
            {teams.map((team) => (
              <div key={team.title} className="mb-16">
                <h2 className="text-3xl font-bold text-white mb-8 text-center">{team.title}</h2>
                <div className="flex flex-wrap justify-center gap-10">
                  {team.members.map((member, index) => (
                    <div
                      key={index}
                      className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 w-80"
                    >
                      <div className="p-6 text-center">
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-32 h-32 md:w-36 md:h-36 lg:w-40 lg:h-40 object-cover rounded-full mx-auto mb-4 border-4 border-white"
                        />
                        <h3 className="text-lg font-semibold text-gray-800 mb-1">{member.name}</h3>
                        <p className="text-gray-600 font-medium mb-4">{member.position}</p>
                        <div className="flex items-center justify-center gap-2 text-gray-700 text-sm mb-2">
                          <Phone className="w-4 h-4" />
                          <span>{member.phone}</span>
                        </div>
                        <div className="flex justify-center gap-4 mt-3">
                          {member.instagram && (
                            <a href={member.instagram} target="_blank" rel="noopener noreferrer">
                              <Instagram className="w-5 h-5 text-pink-500 hover:text-pink-600" />
                            </a>
                          )}
                          {member.linkedin && (
                            <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                              <Linkedin className="w-5 h-5 text-blue-600 hover:text-blue-700" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default Contact;
