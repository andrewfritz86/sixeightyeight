class WelcomeController < ApplicationController
  
  def index
    @bills = Bill.all.to_json
  end

end
