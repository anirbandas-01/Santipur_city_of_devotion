
  return(
    <Router>
      <div className='bg-gray-50 min-h-screen flex flex-col'>

        {/* Navbar + Sidebar*/}
        <Navbar toggleSidebar={toggleSidebar} scrollToSection={scrollToSection}/>
        <SidebarSection 
           isOpen={sidebarOpen}
           toggleSidebar={toggleSidebar}
           scrollToSection={scrollToSection}
        />
 
       {/* Routes */}
       <main className='flex-grow'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/temples" element={<Temples />} />
        </Routes>
       </main>

       {/* Footer always visible */}
        <Footer />
      </div>  
    </Router>
  ); 