import React from 'react';
import Content from '../../layout/content';

export default function UserCreate() {
    return(
        <Content pageHeader="Crear usuario">
            <div className="col-lg-12">
                <div className="box box-info">
                    <div className="box-body">
                        <form>
                            <div className="col-lg-4 form-group">
                                <label>Nombre completo: </label>
                                <input type="text" name="name" required className="form-control"/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Content>
    )
}