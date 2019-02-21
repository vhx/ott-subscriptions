class HomeController < ApplicationController

  # Not sure I used this correctly...
  # My guess would be:
      # after loading the page, the route hits the home controller
      # then hits the index action
      # And then it doesn't render a index view since I am using React
      # I would assume Webpacker looks in the JS folder,
      # looks at the packs
      # the application.js file import HomeIndex from 'pages/home';
      # which then loads all the components
      
  def index
  end

end
