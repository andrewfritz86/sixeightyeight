class BillsController < ApplicationController

  def index
    bills = Bill.all
    render json: bills
  end

  def show
    bill = Bill.find(params[:bill])
    render json: bill
  end

  def create
    bill = Bill.create(bill_params)
    render json: bill
  end

  def update
    bill = Bill.find(params["id"])
    bill.update(bill_params)
    render json: bill
  end


  private

  def bill_params
    params.require(:bill).permit(:owner, :name, :jamie_debt, :dom_debt, :andy_debt, :shamy_debt)
  end

end
