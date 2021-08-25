import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AlertService } from 'src/app/_service/alert.service';
import { TicketService } from 'src/app/_service/ticket.service';

@Component({
    selector: 'app-modifierticket',
    templateUrl: './modifierticket.component.html',
    styleUrls: ['./modifierticket.component.css']
})
export class ModifierticketComponent implements OnInit {

    form: FormGroup=this.formBuilder.group({
        titre: ['', Validators.required],
        description: ['', Validators.required],
        date_creation: ['', Validators.required],
        date_echeance: ['', Validators.required],
        statut: ['', Validators.required],
        type: ['', Validators.required],
        priorite: ['', Validators.required],
        urgence: ['', Validators.required],
        impact: ['', Validators.required],
        image: ['', Validators.required],
        user_id: ['', Validators.required],
    });

    ticket_id: string;
    isAddMode: boolean;
    loading = false;
    submitted = false;
    ticket: any = {};


    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private TicketService: TicketService,
        private alertService: AlertService,
    ) { }

    ngOnInit() {
        this.ticket_id = this.route.snapshot.params['id'];
        this.isAddMode = !this.ticket_id;
        this.TicketService.get(this.ticket_id).subscribe((data) => {
            this.ticket = data
            console.log("ticket****************" + this.ticket.priorite)
        })

        
        if (!this.isAddMode) {
            this.TicketService.get(this.ticket_id).subscribe(x => {
                this.form.patchValue(x);
            });
        }
        }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }

        this.loading = true;
        if (this.isAddMode) {
            this.createTicket();
        } else {
            this.updateTicket();
        }
    }

    private createTicket() {
        this.TicketService.create(this.form.value)
            .pipe(first())
            .subscribe({
                next: () => {
                    this.alertService.success('Ticket added successfully', { keepAfterRouteChange: true });
                    this.router.navigate(['../'], { relativeTo: this.route });
                },
                error: error => {
                    this.alertService.error(error);
                    this.loading = false;
                }
            });
    }


    private updateTicket() {
        const link = ['/ticket'];
        this.TicketService.update(this.ticket_id, this.form.value)
            .pipe(first())
            .subscribe({
                next: () => {
                    this.alertService.success('Update successful', { keepAfterRouteChange: true });
                    this.router.navigate(['../../'], { relativeTo: this.route });
                },
                error: error => {
                    this.alertService.error(error);
                    this.loading = false;
                }
            });
        this.router.navigate(link);
    }
}