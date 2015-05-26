class BillsController < ApplicationController

  def index
    bills = Bill.all
    render json: bills
  end

  def show
    bill = Bill.find(params["id"])
    render json: bill
  end
end
