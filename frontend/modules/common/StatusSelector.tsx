import React, { Component, ChangeEvent } from 'react';
import {
    sendErrorMessage,
    getApplication,
    sendSuccessMessage,
    clearFlashMessages,
    updateApplicationStatus
} from '../../redux/actions';
import { IContext, IApplication } from '../../@types';
import { err } from '../../utils';
import { connect } from 'react-redux';
import { Status } from '../../../shared/app.enums';

type Props = {
    id: string;
    flashError: (msg: string, ctx?: IContext) => void;
    flashSuccess: (msg: string, ctx?: IContext) => void;
    clear: (ctx?: IContext) => void;
};

@((connect as any)(null, {
    flashError: sendErrorMessage,
    flashSuccess: sendSuccessMessage,
    clear: clearFlashMessages
}))
export class StatusSelector extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        };
    }

    componentDidMount = async () => {
        const { id } = this.props;
        const application: IApplication = await getApplication(id, null);
        this.setState({
            loading: false,
            ...application,
            status: application.statusInternal
        })
    }

    onSelect = async (e: ChangeEvent<HTMLSelectElement>) => {
        const { _id } = this.state;
        const status = e.target.value;

        const { flashError, flashSuccess, clear } = this.props;
        try {
            clear();
            const app = await updateApplicationStatus(_id, status);
            console.log("APPP: ", app);
            this.setState({ ...app, status });
            return flashSuccess('Successfully updated application status!');
        } catch (error) {
            return flashError(err(error));
        }
    }

    render() {
        const { loading } = this.state;
        if (loading) return <span>...Loading</span>

        return (
            <div>
                <select
                    required
                    name="status"
                    onChange={this.onSelect}
                    value={this.state.status}
                >
                    {Object.values(Status).map(status => (
                        <option value={status} key={status}>
                            {status}
                        </option>
                    ))}
                </select>
            </div>
        );
    }
}

