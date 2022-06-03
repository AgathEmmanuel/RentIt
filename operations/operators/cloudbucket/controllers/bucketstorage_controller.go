/*
Copyright 2022.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

package controllers

import (
	"context"

	"k8s.io/apimachinery/pkg/runtime"
	ctrl "sigs.k8s.io/controller-runtime"
	"sigs.k8s.io/controller-runtime/pkg/client"
	"sigs.k8s.io/controller-runtime/pkg/log"

	cloudbucketv1alpha1 "github.com/AgathEmmanuel/RentIt/operations/operators/cloudbucket/api/v1alpha1"
)

// BucketStorageReconciler reconciles a BucketStorage object
type BucketStorageReconciler struct {
	client.Client
	Scheme *runtime.Scheme
	GCPSsvc services.GCPSsvc
}

//+kubebuilder:rbac:groups=cloudbucket.operators.rentit.com,resources=bucketstorages,verbs=get;list;watch;create;update;patch;delete
//+kubebuilder:rbac:groups=cloudbucket.operators.rentit.com,resources=bucketstorages/status,verbs=get;update;patch
//+kubebuilder:rbac:groups=cloudbucket.operators.rentit.com,resources=bucketstorages/finalizers,verbs=update

// Reconcile is part of the main kubernetes reconciliation loop which aims to
// move the current state of the cluster closer to the desired state.
// TODO(user): Modify the Reconcile function to compare the state specified by
// the BucketStorage object against the actual cluster state, and then
// perform operations to make the cluster state reflect the state specified by
// the user.
//
// For more details, check Reconcile and its Result here:
// - https://pkg.go.dev/sigs.k8s.io/controller-runtime@v0.11.2/pkg/reconcile
func (r *BucketStorageReconciler) Reconcile(ctx context.Context, req ctrl.Request) (ctrl.Result, error) {
	log := log.FromContext(ctx)

	instance := &cloudbucketv1alpha1.BucketStorage{}
	if err := r.Get(ctx, req.NamespacedName, instance); err != nil {
		log.Error(err, "not able to get the BucketStorage resource")
		return ctrl.Result{}, client.IgnoreNotFound(err)

	}
	if instance.Status.State == "" {
		instance.Status.State = cloudbucketv1alpha1.PENDING_STATE
		r.Status().Update(ctx, instance)
	}

	if instance.Status.State == cloudbucketv1alpha1.PENDING_STATE {
		log.Info("Starting to create Bucket resources")
		if err := r.createResources(ctx,instance); err!=nil {
			instance.Status.State = cloudbucketv1alpha1.ERROR_STATE
			r.Status().Update(ctx,instance)
			log.Error(err,"Buckete creation error")
			return ctrl.Result{}, err
		}
	}
	// TODO(user): your logic here

	return ctrl.Result{}, nil
}

// SetupWithManager sets up the controller with the Manager.
func (r *BucketStorageReconciler) SetupWithManager(mgr ctrl.Manager) error {
	return ctrl.NewControllerManagedBy(mgr).
		For(&cloudbucketv1alpha1.BucketStorage{}).
		Complete(r)
}

func (r *BucketStorageReconciler) createResources(ctx context.Context, bucketstorages *cloudbucketv1alpha1.BucketStorage) error {
	bucketstorages.Status.State = cloudbucketv1alpha1.CREATING_STATE
	err := r.Status().Update(ctx,bucketstorages)
	if err != nil {
		return err
	}
}
