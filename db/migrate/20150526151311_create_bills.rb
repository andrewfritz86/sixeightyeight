class CreateBills < ActiveRecord::Migration
  def change
    create_table :bills do |t|
      t.string :owner
      t.integer :shamy_debt
      t.integer :andy_debt
      t.integer :dom_debt
      t.integer :jamie_debt
      t.string :name

      t.timestamps null: false
    end
  end
end
